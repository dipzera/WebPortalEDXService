export function getCurrentMonthMilliseconds() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();
    return [firstDay, lastDay];
}

export function getCurrentMonth() {
    const monthData = getCurrentMonthMilliseconds();
    let currentMonthDate = [];
    monthData.forEach(month => {
        const d = new Date(month.toString() * 1);
        const dFormat = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`.split(' ');
        currentMonthDate.push(dFormat);
    });
    return currentMonthDate;
}

export function getCurrentMonthWithZeroes() {
    const monthData = getCurrentMonthMilliseconds();
    let currentMonthDate = [];
    monthData.forEach(month => {
        const d = new Date(month.toString() * 1);
        // ('0' + MyDate.getDate()).slice(-2) + '-' + ('0' + (MyDate.getMonth() + 1)).slice(-2) + '-' + MyDate.getFullYear();
        const dFormat = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
        currentMonthDate.push(dFormat);
    })
    return currentMonthDate;
}