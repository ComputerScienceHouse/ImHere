export const Request = async <T, V = undefined>(url: string, options?: RequestInit | undefined, body?: V, status?: number[]): Promise<T> => {
    options ??= {}
    options.body = JSON.stringify(body)
    if (body)
        options.headers = {
            'Content-Type': 'application/json'
        }
    const promiseResponse = await fetch(url, options)
    const data = promiseResponse.status === 200 ? await promiseResponse.json() : await promiseResponse.text()
    if (status)
        status[0] = promiseResponse.status
    return data as T
}