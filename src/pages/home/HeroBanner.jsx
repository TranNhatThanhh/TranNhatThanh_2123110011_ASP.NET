import React from 'react';

function HeroBanner() {
    return (
        <div className="hero-banner py-5 text-white position-relative"
            style={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                minHeight: '400px',
                display: 'flex',
                alignItems: 'center'
            }}>
            <div className="container text-start">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <span className="badge bg-danger mb-3 px-3 py-2 text-uppercase fw-bold" style={{ borderRadius: '20px' }}>
                            Mega Sale Off - 50%
                        </span>
                        <h1 className="display-4 font-weight-bold fw-black mb-3">
                            THẾ GIỚI GEAR & <br />PHỤ KIỆN GAMING
                        </h1>
                        <p className="lead text-light mb-4">
                            Nâng tầm trải nghiệm làm việc và chiến game với những mẫu bàn phím cơ, chuột và tai nghe cao cấp nhất.
                        </p>
                        <button className="btn btn-warning btn-lg fw-bold px-4 py-3 text-dark" style={{ borderRadius: '30px' }}>
                            Mua Ngay Hôm Nay
                        </button>
                    </div>
                    <div className="col-md-6 text-center d-none d-md-block">
                        <img
                            src="https://img.freepik.com/free-vector/realistic-computer-mouse-gaming-keyboard-with-neon-illumination-blank-monitor-dark-background-illustration_1284-63309.jpg"
                            alt="Gaming Setup Gear"
                            className="img-fluid"
                            style={{ maxHeight: '350px', objectFit: 'contain', filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.3))' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroBanner;