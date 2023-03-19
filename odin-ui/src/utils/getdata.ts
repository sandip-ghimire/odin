/** 
 *  utility function to fetch data from backend
 */
export async function getData(url: string) {

    try{
        const response = await fetch(url);
        return await response.json();
    }catch(error) {
        return [];
    }
    
}