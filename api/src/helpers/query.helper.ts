
export const buildImageProjectionFilter = (regex: string): any => {
    return {
        $filter: {
            input: "$images",
            as: "i",
            cond: {
                $regexMatch: {
                    input: "$$i.url",
                    regex: regex
                }
            }
        }
    }
}
