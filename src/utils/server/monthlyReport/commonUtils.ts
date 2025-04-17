
export function getPrevShortMonth(month: string, year: number) {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    const date = new Date(year, monthIndex, 1);

    // Move back one month
    date.setMonth(date.getMonth() - 1);

    const prevMonth = date.toLocaleString('default', { month: 'short' });
    const prevYear = date.getFullYear() === year ? year - 1 : date.getFullYear();

    return ({
        month: prevMonth,
        year: prevYear,
    })
}

export function getDateRangeForMonth(month: string, year: number, debug?: boolean) {
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);

    const formatter = (date: Date) => date.toISOString().split('T')[0];

    if (debug) {
        console.log('\n')
        console.log(monthIndex);
        console.log(startDate.toISOString());
        console.log(endDate.toISOString());
        console.log('\n')
    }

    return ({
        startDate: formatter(startDate),
        endDate: formatter(endDate),
    })
}

export function getLast12MonthsRanges({
    fromDate,
}: {
    fromDate: string,
}): {
    startDate: string;
    endDate: string,
}[] {
    const date = new Date(fromDate);
    const ranges = [];

    for (let i = 0; i < 12; i++) {
        const firstDay = new Date(date.getFullYear(), date.getMonth() - i, 1);
        const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);

        ranges.push({
            startDate: firstDay.toISOString().split('T')[0],
            endDate: lastDay.toISOString().split('T')[0],
        });
    }

    return ranges.reverse(); // So it's from oldest to newest
}

export function calculatePercentage({
    newValue,
    prevValue,
}: {
    prevValue: number,
    newValue: number,
}) {
    if (
        newValue === prevValue ||
        prevValue === 0 && newValue === 0
    ) {
        return 0;
    } else if (prevValue === 0) {
        return 100;
    } else {
        const value = ((newValue - prevValue) / prevValue) * 100;
        return value;
    }
}