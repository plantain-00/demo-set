function throwError(res, code, err) {
    res.status(code).json({
        error: err.message == undefined ? err : err.message,
        document_url: "/api/v1"
    });
}
exports.throwError = throwError;
//# sourceMappingURL=error.js.map