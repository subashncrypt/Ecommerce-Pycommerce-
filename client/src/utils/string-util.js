/*
* @author: Adesh Nalpet Adimurthy
*/

export const Shorten = (text) => {
    if (text.length > 50) {
        return text.substring(0, 50) + '...';
    }
    return text;
}
