import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
    CandlestickSeries,
    LineSeries,
    BollingerSeries,
    BarSeries,
    AreaSeries,
    // SARSeries,
    RSISeries,
    StochasticSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    CurrentCoordinate,
    MouseCoordinateX,
    MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
// import { TrendLine, DrawingObjectSelector } from "react-stockcharts/lib/interactive";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip, MovingAverageTooltip, BollingerBandTooltip, RSITooltip, StochasticTooltip, SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { /*sar, */atr, rsi, ema, sma, bollingerBand, stochasticOscillator } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

const bbStroke = {
    top: "#964B00",
    middle: "#000000",
    bottom: "#964B00",
};

const bbFill = "#4682B4";

const stoAppearance = {
    stroke: Object.assign({},
        StochasticSeries.defaultProps.stroke)
};

class CandleStickChartWithBollingerBandOverlay extends React.Component {
    render() {
        const { type, data: initialData, width, ratio } = this.props;

        // EMA
        const ema20 = ema()
            .options({
                windowSize: 20, // optional will default to 10
                sourcePath: "close" // optional will default to close as the source
            })
            .skipUndefined(true) // defaults to true
            .merge((d, c) => { d.ema20 = c; }) // Required, if not provided, log a error
            .accessor(d => d.ema20) // Required, if not provided, log an error during calculation
            .stroke("blue"); // Optional

        // const sma20 = sma()
        //   .options({ windowSize: 20 })
        //   .merge((d, c) => { d.sma20 = c; })
        //   .accessor(d => d.sma20);

        const ema50 = ema()
            .options({ windowSize: 50 })
            .merge((d, c) => { d.ema50 = c; })
            .accessor(d => d.ema50);

        const ema200 = ema()
            .options({ windowSize: 200 })
            .merge((d, c) => { d.ema200 = c; })
            .accessor(d => d.ema200);

        const smaVolume50 = sma()
            .options({ windowSize: 20, sourcePath: "volume" })
            .merge((d, c) => { d.smaVolume50 = c; })
            .accessor(d => d.smaVolume50)
            .stroke("#4682B4")
            .fill("#4682B4");

        // BOLLINGER
        const bb = bollingerBand()
            .merge((d, c) => { d.bb = c; })
            .accessor(d => d.bb);

        // SAR
        // const accelerationFactor = .02;
        // const maxAccelerationFactor = .2;

        // const defaultSar = sar()
        //   .options({ accelerationFactor, maxAccelerationFactor })
        //   .merge((d, c) => { d.sar = c; })
        //   .accessor(d => d.sar);

        // RSI
        const rsiCalculator = rsi()
            .options({ windowSize: 14 })
            .merge((d, c) => { d.rsi = c; })
            .accessor(d => d.rsi);

        const atr14 = atr()
            .options({ windowSize: 14 })
            .merge((d, c) => { d.atr14 = c; })
            .accessor(d => d.atr14);

        // STO
        const fullSTO = stochasticOscillator()
            .options({ windowSize: 14, kWindowSize: 3, dWindowSize: 4 })
            .merge((d, c) => { d.fullSTO = c; })
            .accessor(d => d.fullSTO);

        // TRENDS
        const trends = [{ start: [1606, 12000], end: [1711, 13000], appearance: { stroke: "green" }, type: "XLINE" }]

        // CALC
        const calculatedData = fullSTO(rsiCalculator(atr14(/*defaultSar*/(ema20(ema50(ema200(smaVolume50(bb(initialData)))))))));
        const xScaleProvider = discontinuousTimeScaleProvider
            .inputDateAccessor(d => d.date);

        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = xScaleProvider(calculatedData);

        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 150)]);
        const xExtents = [start, end];

        return (
            <ChartCanvas height={800}
                width={width}
                ratio={ratio}
                margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
                type={type}
                seriesName="MSFT"
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
                xExtents={xExtents}
            >
                <Chart id={1}
                    yExtents={[d => [d.high, d.low], ema20.accessor(), ema50.accessor(), ema200.accessor(), bb.accessor()]}
                    padding={{ top: 50, bottom: 430 }}
                    onContextMenu={(...rest) => { console.log("chart - context menu", rest); }}
                >
                    <XAxis axisAt="bottom" orient="bottom" />
                    <YAxis axisAt="right" orient="right" ticks={5}
                        onDoubleClick={(...rest) => { console.log("yAxis - double click", rest); }}
                        onContextMenu={(...rest) => { console.log("yAxis - context menu", rest); }}
                    />

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%d-%m-%Y %H:%M")} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".7f")} />

                    <CandlestickSeries />
                    <BollingerSeries yAccessor={d => d.bb}
                        stroke={bbStroke}
                        fill={bbFill} />

                    <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} />
                    <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} />
                    <LineSeries yAccessor={ema200.accessor()} stroke={ema200.stroke()} />
                    <CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
                    <CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />
                    <CurrentCoordinate yAccessor={ema200.accessor()} fill={ema200.stroke()} />

                    <OHLCTooltip origin={[-40, 0]} />

                    <MovingAverageTooltip
                        onClick={e => console.log(e)}
                        origin={[-38, 15]}
                        options={[
                            {
                                yAccessor: ema20.accessor(),
                                type: ema20.type(),
                                stroke: ema20.stroke(),
                                windowSize: ema20.options().windowSize,
                            },
                            {
                                yAccessor: ema50.accessor(),
                                type: ema50.type(),
                                stroke: ema50.stroke(),
                                windowSize: ema50.options().windowSize,
                            },
                            {
                                yAccessor: ema200.accessor(),
                                type: ema200.type(),
                                stroke: ema200.stroke(),
                                windowSize: ema200.options().windowSize,
                            }
                        ]}
                    />
                </Chart>

                {/* VOL */}
                <Chart id={2}
                    yExtents={[d => d.volume, smaVolume50.accessor()]}
                    height={90} origin={(w, h) => [0, h - 450]}
                >
                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />

                    <MouseCoordinateY
                        at="left"
                        orient="left"
                        displayFormat={format(".4s")} />

                    <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
                    <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()} />
                    <CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()} />
                    <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />
                </Chart>

                {/* RSI */}
                <Chart id={3}
                    yExtents={[0, 100]}
                    height={120} origin={(w, h) => [0, h - 350]}
                >
                    <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
                    <YAxis axisAt="right"
                        orient="right"
                        tickValues={[30, 50, 70]} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".7f")} />

                    <RSISeries yAccessor={d => d.rsi} />

                    <RSITooltip origin={[-38, 15]}
                        yAccessor={d => d.rsi}
                        options={rsiCalculator.options()} />
                </Chart>

                {/* ATR */}
                <Chart id={4}
                    yExtents={atr14.accessor()}
                    height={90} origin={(w, h) => [0, h - 250]} padding={{ top: 10, bottom: 10 }}
                >
                    <XAxis axisAt="bottom" orient="bottom" />
                    <YAxis axisAt="right" orient="right" ticks={2} />

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%d-%m-%Y %H:%M")} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".7f")} />

                    <LineSeries yAccessor={atr14.accessor()} stroke={atr14.stroke()} />
                    <SingleValueTooltip
                        yAccessor={atr14.accessor()}
                        yLabel={`ATR (${atr14.options().windowSize})`}
                        yDisplayFormat={format(".7f")}
                        /* valueStroke={atr14.stroke()} - optional prop */
                        /* labelStroke="#4682B4" - optional prop */
                        origin={[-40, 15]} />
                </Chart>

                {/* Stochastic */}
                <Chart id={5}
                    yExtents={[0, 100]}
                    height={125} origin={(w, h) => [0, h - 125]} padding={{ top: 10, bottom: 10 }}
                >
                    {/* <XAxis axisAt="bottom" orient="bottom" {...xGrid} /> */}
                    <YAxis axisAt="right" orient="right"
                        tickValues={[20, 50, 80]} />

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat("%d-%m-%Y %H:%M")} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".7f")} />
                    <StochasticSeries
                        yAccessor={d => d.fullSTO}
                        {...stoAppearance} />

                    <StochasticTooltip
                        origin={[-38, 15]}
                        yAccessor={d => d.fullSTO}
                        options={fullSTO.options()}
                        appearance={stoAppearance}
                        label="Full STO" />
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        );
    }
}

CandleStickChartWithBollingerBandOverlay.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
    trendLine: PropTypes.bool.isRequired
};

CandleStickChartWithBollingerBandOverlay.defaultProps = {
    type: "svg"
};

export default fitWidth(CandleStickChartWithBollingerBandOverlay);
