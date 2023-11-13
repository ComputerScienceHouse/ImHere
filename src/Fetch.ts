export const Request = async <T, V = undefined>(url: string, options?: RequestInit | undefined, body?: V): Promise<T> => {
    options ??= {}
    options.body = JSON.stringify(body)
    options.headers = {
        'Content-Type': 'application/json'
    }
    const promiseResponse = await fetch(url, options)
    const data = await promiseResponse.json()
    return data as T
}