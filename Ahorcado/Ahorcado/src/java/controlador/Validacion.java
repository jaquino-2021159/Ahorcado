package controlador;
 
import modelo.Usuario;
import modelo.UsuarioDAO;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
 
/**
* Servlet de validación de usuario para el inicio de sesión.
*
* @author Jorge
*/
@WebServlet(name = "Validacion", urlPatterns = {"/Validacion"})
public class Validacion extends HttpServlet {
 
    /**
     * Maneja las peticiones POST desde el formulario de login.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException si ocurre un error específico del servlet
     * @throws IOException si ocurre un error de I/O
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
 
        String usuario = request.getParameter("usuario");
        String contrasena = request.getParameter("contrasena");
 
        UsuarioDAO dao = new UsuarioDAO();
 
        Usuario user = dao.validarUsuario(usuario, contrasena);
 
        if (user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("usuarioLogueado", user);
            response.sendRedirect("ahorcado.jsp");
        } else {
            System.out.println("Intento de login fallido. Usuario o contraseña incorrectos para: " + usuario); 
            request.setAttribute("error", "Usuario o contraseña incorrectos");
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }
}