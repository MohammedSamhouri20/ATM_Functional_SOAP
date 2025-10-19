
// export const login = async (req: any, res: any) => {
//     const accountId : number = req.body.accountId;
//     const pin: string = req.body.PIN;

//     const authenticationResult = await authenticateAccount({accountId, pin});
//     if (authenticationResult.success)
//         req.session.accountId = accountId;
    
//     res.status(200).json(authenticationResult)
// }