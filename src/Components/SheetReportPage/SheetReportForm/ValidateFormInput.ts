
export function validateSheetReportFormInput ({baseUrl}: {
    baseUrl: string,
}) {

    const urlRegEx = /^(http(s):\/\/.|http:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/
    
    if(!baseUrl || !urlRegEx.test(baseUrl)) {
        return false
    } else {
        return true
    }

}