const awaiting = async (data: any, ms: number = 100) => {
    return await new Promise<any>((resolve) => {
        setTimeout(() => resolve(data), ms)
    });
}

export default awaiting