export function calculateDaysDifference(targetDate: Date) {
    // Get the current date in UTC
    const currentDate = new Date();
    // Calculate the difference in milliseconds
    const differenceInMilliseconds =
        currentDate.getTime() - targetDate.getTime();
    // Convert milliseconds to days
    const differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
}
