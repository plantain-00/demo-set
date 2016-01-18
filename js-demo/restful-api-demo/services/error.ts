export function throwError(res, code:number, err):void {
    res.status(code).json({
        error: err.message == undefined ? err : err.message,
        document_url: "/api/v1"
    });
}