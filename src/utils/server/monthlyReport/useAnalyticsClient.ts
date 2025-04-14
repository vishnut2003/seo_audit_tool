import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "@google-analytics/data/build/protos/protos";

export interface AnalyticsClientReturnValueInterface {
    dimensions: string[],
    metrics: number[],
}

export async function fetchAnalyticsClient({
    analyticsClient,
    dateRange,
    dimensions,
    metrics,
    propertyId,
    orderBys,
}: {
    analyticsClient: BetaAnalyticsDataClient,
    propertyId: string,
    dateRange: {
        startDate: string,
        endDate: string,
    },
    dimensions: {
        name: string,
    }[],
    metrics: {
        name: string,
    }[],
    orderBys?: google.analytics.data.v1beta.IRunReportRequest['orderBys']
}) {
    return new Promise<AnalyticsClientReturnValueInterface[]>(async (resolve, reject) => {
        try {

            const [response] = await analyticsClient.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [dateRange],
                dimensions,
                metrics,
                orderBys,
            })

            const finalResponse: AnalyticsClientReturnValueInterface[] = [];

            for (const row of response.rows || []) {
                const dimensions: string[] = [];
                const metrics: number[] = [];

                for (const dimension of row.dimensionValues || []) {
                    dimensions.push(dimension.value || "none");
                }

                for (const metric of row.metricValues || []) {
                    const value = metric.value;
                    const intValue = parseInt(value || "0");
                    metrics.push(intValue);
                }

                const data: AnalyticsClientReturnValueInterface = {
                    dimensions,
                    metrics,
                }

                finalResponse.push(data);
            }
            
            return resolve(finalResponse);

        } catch (err) {
            return reject(err);
        }
    })
}