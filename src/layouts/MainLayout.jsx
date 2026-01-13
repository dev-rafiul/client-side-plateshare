
import Navbar from '../../src/components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className='min-h-screen bg-base-100 text-base-content'>
            
            <Navbar></Navbar>

            <section className="bg-base-100">
                <Outlet></Outlet>
            </section>

            
                <Footer></Footer>
        </div>
    );
};

export default MainLayout;