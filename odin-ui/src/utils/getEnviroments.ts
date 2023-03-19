/** 
 * utility function to get environment variables
 */
export const getEnvironments = (key?:string) => {
    
    const variables = process.env;

    if (key) {
        return key in variables ? variables[key] : '';
    }

    return {
        ...variables
    }
}