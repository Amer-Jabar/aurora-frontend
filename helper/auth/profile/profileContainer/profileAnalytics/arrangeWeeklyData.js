
export const arrangeWeeklyData = (data) => {

    const today = new Date().getDate();
    let daysOfWeek = [];

    for ( let i = today - 6; i <= today; i++  ) {
        daysOfWeek.push({
            day: i,
            value: 0
        });
    }

    let days = null;
    let activityRate = null;

    if ( data !== null && data?.length && data?.length > 0 ) {
        daysOfWeek = daysOfWeek.map(({ day, value }) => {
            let dayValue = value;
            data.forEach(({ createdAt }) => {
                const dataDate = new Date(createdAt).getDate()
                if ( day == dataDate )
                    dayValue++;
            })
            return {
                day, value: dayValue
            }
        })

        activityRate = daysOfWeek.map(({ value }) => value);    
    } else if ( data === null || data?.length === 0 || typeof(data) === 'object' ) {
        activityRate = daysOfWeek.map(() => 0);
    }
    days = daysOfWeek.map(({ day }) => day);

    const combinedData = days.map((day, index) => ({ x: day, y: activityRate[index] }))

    return combinedData;
}
