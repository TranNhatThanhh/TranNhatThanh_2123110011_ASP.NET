import React, { useState, useEffect } from 'react';
import blogService from '../../services/postService';
// IMPORT  component CON VÀO ?? S? D?NG
import PostCard from '../../components/PostCard';




function LatestBlog() { // ch? l?y 3 tin
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                setLoading(true);
                const data = await blogService.getAllPosts();
                const topThreePosts = data.sort((a, b) => b.id - a.id).slice(0, 3);
                setPosts(topThreePosts);
            } catch (error) {
                console.error("L?i h? th?ng khi t?i tin t?c th?i trang:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLatestPosts();
    }, []);




    if (loading) {
        return (
            <div className="container my-4 text-center">
                <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>
                <span className="ml-2 text-muted" style={{ fontSize: '14px' }}>?ang n?p tin t?c xu h??ng...</span>
            </div>
        );
    }




    return (
        <section className="latest-blog-section py-5" style={{ backgroundColor: '#fdfbf7' }}>
            <div className="container">


                <div className="section-heading mb-4 text-center">
                    <h3 className="font-weight-bold text-uppercase" style={{ color: '#005088' }}>
                        Xu H??ng Th?i Trang
                    </h3>
                    <p className="text-muted lead" style={{ fontSize: '15px' }}>
                        C?p nh?t nh?ng m?o ph?i ?? và tin t?c phong cách m?i nh?t cùng ThaiCMS
                    </p>
                    <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#11CAA0' }}></div>
                </div>




                {/* KHUNG L??I ??NG B?  component CON */}
                <div className="row mt-5">
                    {posts.map((item) => (
                        <div className="col-lg-4 col-md-6 col-12 mb-4" key={item.id}>
                            {/* CHÈN COMPONENT CON VÀ TRUY?N D? LI?U QUA PROP post */}
                            <PostCard post={item} />
                        </div>
                    ))}
                </div>




            </div>
        </section>
    );
}




export default LatestBlog;
