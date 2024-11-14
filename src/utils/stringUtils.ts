export function capitalize(str: string = "No string provided"): string {
    let newStr = str[0].toUpperCase() + str.substring(1, str.length);
    return newStr;
}
