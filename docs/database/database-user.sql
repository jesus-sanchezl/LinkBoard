
INSERT INTO users (username, email, password, image, description) VALUES
('juan123', 'juan@example.com', 'password1', 'juan.jpg', 'Amante de la tecnología y los videojuegos'),
('maria2020', 'maria@example.com', 'password2', 'maria.png', 'Entusiasta del cine y la fotografía'),
('pedroTech', 'pedro@example.com', 'password3', 'pedro.jpg', 'Ingeniero de software y blogger'),
('ana_blogs', 'ana@example.com', 'password4', 'ana.png', 'Escritora freelance y crítica de libros'),
('lucas_dev', 'lucas@example.com', 'password5', 'lucas.jpg', 'Desarrollador web y diseñador gráfico');


INSERT INTO links (user_id, url, titulo, image, description) VALUES
(1, 'https://techreview.com/article123', 'Análisis del último smartphone', 'smartphone.jpg', 'Un análisis profundo del último smartphone lanzado al mercado.'),
(2, 'https://photoworld.com/maria-gallery', 'Mi galería de fotos de viaje', 'travel.jpg', 'Explora mis mejores fotografías de viajes alrededor del mundo.'),
(3, 'https://devblog.com/pedro-how-to-code', 'Guía para empezar a programar en Python', 'python.jpg', 'Una guía detallada para principiantes en programación con Python.'),
(4, 'https://bookreviews.com/ana-top10', 'Los 10 mejores libros de 2023', 'books.jpg', 'Una lista con reseñas de los mejores libros publicados en 2023.'),
(5, 'https://designhub.com/lucas-portfolio', 'Mi portafolio de diseño web', 'portfolio.jpg', 'Una muestra de mis trabajos recientes en diseño web y desarrollo.');


INSERT INTO ratings (user_id, link_id, rating) VALUES
(2, 1, 5), 
(3, 2, 4),  
(4, 3, 5),  
(5, 4, 3),  
(1, 5, 4);  


INSERT INTO comments (user_id, link_id, comment_text) VALUES
(2, 1, '¡Gran análisis! Me ayudó a decidirme por mi próxima compra.'),  
(3, 2, '¡Qué fotos tan increíbles! Definitivamente visitaré algunos de esos lugares.'),  
(4, 3, 'Esta guía es exactamente lo que necesitaba. ¡Gracias por compartir!'), 
(5, 4, 'Buena selección de libros, aunque me faltó ver algunos títulos.'),  
(1, 5, '¡Excelente portafolio! Me gustaron especialmente los proyectos más recientes.');  
