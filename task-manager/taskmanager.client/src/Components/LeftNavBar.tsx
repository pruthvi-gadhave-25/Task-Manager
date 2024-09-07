import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import taskIcon from '../Icons/tasklist.svg';
import clock from '../Icons/clock.svg';
import './LeftNavBar.css';

class LeftNavBar extends Component {

    setActive = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const target = event.currentTarget;
        const btns = document.getElementsByClassName("left-nav-link");

        for (let i = 0; i < btns.length; i++) {
            if (btns[i] !== target && btns[i].classList) {
                btns[i].classList.remove('active');
            }
        }

        target.classList.add('active');
    };

    render() {
        return (
            <div className="left-menubar">
                <div className="left-nav-header d-flex align-items-center pl-3">
                    <h6 className="application-heading text-white m-0 p-0 text-center">Task Manager</h6>
                </div>
                <div className='left-nav-body'>
                    <ul id="LeftMenuList" className="left-menu-list list-unstyled pt-3">
                        <li onClick={this.setActive} className='rounded mx-2 py-1  cursor-pointer left-nav-link active' >
                            <ReactSVG className='icon d-inline-block ml-2' src={taskIcon} />
                            <Link to="/" className="text-white ml-2">Tasks</Link>
                        </li>
                        <li onClick={this.setActive} className='rounded mx-2 py-1 cursor-pointer left-nav-link'>
                            <ReactSVG className='icon d-inline-block ml-2' src={clock} />
                            <Link to="/timeTracking" className="show-time-tracking text-white ml-2">Time Tracking</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer d-flex align-items-center justify-content-center ">
                    <span className='text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                        </svg>
                    </span>
                </div>
            </div>
        );
    }
}

export default LeftNavBar;