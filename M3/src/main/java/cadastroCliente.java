import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
/**
 *
 * @author Matheus
 */

public class cadastroCliente extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, SQLException, ClassNotFoundException, Exception {
        
        
        Connection conexao = DataBaseManager.conectaBD();
        
        String nome = request.getParameter("nome");
        String cpf = request.getParameter("cpf");
        String senha = request.getParameter("senha");
        String email = request.getParameter("email");
        String cep = request.getParameter("cep");
        String numeroCasa = request.getParameter("numeroResidencia");
        String complemento = request.getParameter("complemento");
        
        String sql = "INSERT INTO `clientes` (`nome`, `cpf`, `senha`, `email`, `cep`, `numero_casa`, `complemento`) VALUES ('" + nome + "', '" + cpf + "', '" + senha + "', '"+ email + "', '" + cep + "', '" + numeroCasa + "', '" + complemento + "');";
        
        PreparedStatement ps = conexao.prepareStatement(sql);
        ps.execute();
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
        } catch (Exception ex){
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
        } catch (Exception ex){
            response.setStatus(400);
        }
    }

}
