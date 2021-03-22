
// @ts-ignore
const jwtHelper = require("../helpers/jwt.helper");
// @ts-ignore
const {passwordCheck} = require("./index");
// @ts-ignore
const {db} = require("./index");
// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
// Trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
const  tokenList = {};

// Thời gian sống của token
const accessTokenLife =  "1h";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
// @ts-ignore
const accessTokenSecret =  "cuongdc";
// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-cuongdc";

const login = async (req,res) =>{
    try {
        // Mình sẽ comment mô tả lại một số bước khi làm thực tế cho các bạn như sau nhé:
        // - Đầu tiên Kiểm tra xem email người dùng đã tồn tại trong hệ thống hay chưa?
        // - Nếu chưa tồn tại thì reject: User not found.
        // - Nếu tồn tại user thì sẽ lấy password mà user truyền lên, băm ra và so sánh với mật khẩu của user lưu trong Database
        // - Nếu password sai thì reject: Password is incorrect.
        // - Nếu password đúng thì chúng ta bắt đầu thực hiện tạo mã JWT và gửi về cho người dùng.
        // Trong ví dụ demo này mình sẽ coi như tất cả các bước xác thực ở trên đều ok, mình chỉ xử lý phần JWT trở về sau thôi nhé:
        const result = await db.query('SELECT id,email,password_crypt FROM accounts.user where email = $1',[req.body.email])
        if(result.rows.length>=1){
            const userData = {
                id: result.rows[0].id ,
                email: result.rows[0].email ,
                password_crypt: result.rows[0].password_crypt
            };
            if(passwordCheck(req.body.password,result.rows[0].password_crypt)){
                // debug(`Thực hiện tạo mã Token, [thời gian sống 1 giờ.]`);
                const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);

                // debug(`Thực hiện tạo mã Refresh Token, [thời gian sống 1 năm] =))`);
                const refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);

                // Lưu lại 2 mã access & Refresh token, với key chính là cái refreshToken để đảm bảo unique và không sợ hacker sửa đổi dữ liệu truyền lên.
                // lưu ý trong dự án thực tế, nên lưu chỗ khác, có thể lưu vào Redis hoặc DB
                tokenList[refreshToken] = {accessToken, refreshToken};
                return res.status(200).json({accessToken, refreshToken});
            }
            else {
                return res.status(400).json({
                    message:"Wrong password"
                });
            }

        }
        else {
            return res.status(400).json({
                message:"User not found"
            });
        }




    } catch (error) {
        return res.status(500).json(error);
    }
}
const refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;
    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
            console.log(decoded)
            // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
            const userData = decoded.data;

            const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);

            // gửi token mới về cho người dùng
            return res.status(200).json({accessToken});
        } catch (error) {
            res.status(403).json({
                message: 'Invalid refresh token.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};
module.exports = {
    login: login,
    refreshToken: refreshToken,
}
