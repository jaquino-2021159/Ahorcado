package controlador;

import modelo.Palabra;
import modelo.PalabraDAO;
import config.Conexion;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

@WebServlet(name = "PalabraControlador", urlPatterns = {"/PalabraControlador"})
public class PalabraControlador extends HttpServlet {

    PalabraDAO dao = new PalabraDAO();
    Conexion con = new Conexion();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        String menu = request.getParameter("menu");
        String accion = request.getParameter("accion");
        if (menu.equals("Palabra")) {
            switch (accion) {
                case "Listar":
                    List<Palabra> lista = dao.listar();
                    request.setAttribute("lista", lista);
                    request.getRequestDispatcher("index.jsp").forward(request, response);
                    break;
                case "ListarJSON":
                    response.setContentType("application/json");
                    PrintWriter out = response.getWriter();
                    List<Palabra> palabras = dao.listar();
                    out.print("[");
                    for (int i = 0; i < palabras.size(); i++) {
                        Palabra p = palabras.get(i);
                        out.print("{");
                        out.print("\"palabra\":\"" + p.getPalabra() + "\",");
                        out.print("\"pistas\":[");
                        out.print("\"" + p.getPista1() + "\",");
                        out.print("\"" + p.getPista2() + "\",");
                        out.print("\"" + p.getPista3() + "\"");
                        out.print("],");
                        out.print("\"imagen\":\"" + p.getImagen() + "\"");
                        out.print("}");
                        if (i < palabras.size() - 1) {
                            out.print(",");
                        }
                    }
                    out.print("]");
                    out.flush();
                    break;
                case "Agregar":
                    
                    break;
                case "Actualizar":
                   
                    break;
                case "Eliminar":
                 
                    break;
            }
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }
}