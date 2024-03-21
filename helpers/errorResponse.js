export default async function ErrorResponse(res, message, status = 400) {
    const resObj = {
        success: false,
        error: false,
        message: '',
        data: {},
    };

    resObj.data = {};
    resObj.success = false;
    resObj.error = true;
    resObj.message = message ?? 'Internal Server Error';
    return res.status(status).json(resObj);
}
