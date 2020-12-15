import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.security.Key;
import java.sql.Date;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.Cookie;
import javax.xml.bind.DatatypeConverter;

/**
 *
 * @author Matheus
 */
@WebServlet(urlPatterns = {"/loginCliente"})
public class loginCliente extends HttpServlet {
    
    private  String createJWT(String id, String issuer, String subject, long ttlMillis) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary("batata");
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        JwtBuilder builder = Jwts.builder().setId(id)
                .setIssuedAt(now)
                .setSubject(subject)
                .setIssuer(issuer)
                .signWith(signatureAlgorithm, signingKey);

        if (ttlMillis > 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }  
        
        return builder.compact();
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ClassNotFoundException, SQLException {
        Connection conexao = DataBaseManager.conectaBD();
        
        String cpf = request.getParameter("cpf");
        String senha = request.getParameter("senha");
        
        String sql = "select nome from clientes where cpf like '"+cpf+"' and senha like '"+senha+"';";
        
        PreparedStatement ps = conexao.prepareStatement(sql);
        ResultSet rs = ps.executeQuery();
        
        rs.next();
        
        if(rs.getRow() > 0){
            
            String jwt = createJWT(cpf,"login","cliente", 10800000);
            Cookie jwtCookie = new Cookie("jwt",jwt);
                    
            jwtCookie.setHttpOnly(true);
            jwtCookie.setMaxAge(10800000);

                    
            response.addCookie(jwtCookie);

            response.setStatus(200);
        }else{
            response.setStatus(400);
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (SQLException ex) {
            response.setStatus(400);
        } catch (ClassNotFoundException ex) {
            response.setStatus(400);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (SQLException ex) {
            response.setStatus(400);
        } catch (ClassNotFoundException ex) {
            response.setStatus(400);
        }
    }

}
