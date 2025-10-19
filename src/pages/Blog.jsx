import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheet.css'; 

const blogPosts = [
  {
    id: 1,
    title: 'La Receta Definitiva de Pastel de Chocolate',
    excerpt: 'Descubre los secretos para hornear el pastel más húmedo y delicioso. ¡Ideal para cualquier ocasión!',
    image: '/img/chocolate.jpg'
  },
  {
    id: 2,
    title: '5 Trucos para Decorar Cupcakes como un Profesional',
    excerpt: 'Aprende técnicas sencillas para que tus cupcakes luzcan espectaculares. ¡Boquillas, glaseado y más!',
    image: '/img/cupcakes.jpg.jpg' 
  },
  {
    id: 3,
    title: 'Guía para Principiantes: Hornea tus Propios Macarons',
    excerpt: 'Los macarons no tienen por qué ser intimidantes. Sigue esta guía paso a paso y sorpréndete.',
    image: '/img/macarons.jpg.webp' 
  }
];

const BlogPostCard = ({ post }) => (
  <article className="card blog-post">
    <img src={post.image} alt={post.title} width="300" height="250" />
    <div className="post-content">
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <Link to={`/blog/${post.id}`} className="btn read-more">Leer más</Link>
    </div>
  </article>
);

const Blog = ({ onNavigate }) => {
  const navigate = useNavigate();
  return (
    <div className="container" style={{padding: '2rem'}}>
        <h2>Últimas Publicaciones</h2>
        
        <div className="blog-container products-grid">
          {blogPosts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <button className="btn" onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
    </div>
  );
};

export default Blog;