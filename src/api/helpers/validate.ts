// validate month props to given month's name
enum Month {
    MAY = "may",
    JUNE = "june",
    JULY = "july",
}

export function validate(month: Month) {
    const toLowerCaseName = month.toLowerCase();
    if (
        toLowerCaseName == Month.MAY ||
        toLowerCaseName == Month.JUNE ||
        toLowerCaseName == Month.JULY
    ) {
        return toLowerCaseName;
    }
}

export function checkPageAndCountValue(req) {
    const { page, count } = req.query;
    if (!isNaN(parseInt(page)) && !isNaN(parseInt(count))) {
        req.page = parseInt(page);
        req.count = parseInt(count);
        return;
    }
}
