import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, UserRound, LogOut, CalendarDays, HeartPulse, House, Stethoscope, Info, LayoutDashboard, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/auth/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useAdmin } from "../context/admin/useAdmin";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAdmin } = useAdmin();

    const { user } = useAuth();

    const displayName =
        user?.displayName ||
        user?.email?.split("@")[0] ||
        "User";

    const handleLogout = async () => {
        try {
            await signOut(auth);

            setIsMenuOpen(false);

            toast.success("Logged out successfully.");
        } catch (error) {
            console.error(error);

            toast.error("Failed to logout. Please try again.");
        }
    };

    const navLinkClass = ({ isActive }) =>
        `transition-colors ${isActive
            ? "text-sky-600 font-semibold"
            : "text-slate-600 hover:text-sky-600"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/40 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    to="/"
                    className="group flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white shadow-md shadow-sky-500/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-sky-600 group-hover:shadow-lg group-hover:shadow-sky-500/30">
                        <HeartPulse size={22} />
                    </div>

                    <span className="text-2xl font-bold tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-sky-600">
                        Medicare
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-7 lg:flex">
                    <NavLink to="/" className={navLinkClass}>
                        Home
                    </NavLink>

                    <NavLink to="/doctors" className={navLinkClass}>
                        Doctors
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={navLinkClass}
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={navLinkClass}
                    >
                        Contact
                    </NavLink>

                    {user ? (
                        <>
                            <NavLink to="/my-appointments"
                                className={navLinkClass}>
                                My Appointments
                            </NavLink>

                            {isAdmin && (
                                <NavLink
                                    to="/admin"
                                    className={navLinkClass}
                                >
                                    Admin Dashboard
                                </NavLink>
                            )}

                            <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                                        <UserRound size={18} />
                                    </div>

                                    <span className="max-w-32 truncate text-sm font-medium text-slate-700">
                                        {displayName}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-500"
                                >
                                    <LogOut size={17} />
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">
                            <Link
                                to="/login"
                                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-sky-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen((previous) => !previous)}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
                    <nav className="flex flex-col gap-2">

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `transition ${isActive
                                    ? "bg-sky-50 text-sky-600 font-semibold"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                                }`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="flex items-center gap-2 rounded-lg px-3 py-2">
                                <House size={18} />
                                Home
                            </span>
                        </NavLink>

                        <NavLink
                            to="/doctors"
                            className={({ isActive }) =>
                                `transition ${isActive
                                    ? "bg-sky-50 text-sky-600 font-semibold"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                                }`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="flex items-center gap-2 rounded-lg px-3 py-2">
                                <Stethoscope size={18} />
                                Doctors
                            </span>
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `transition ${isActive
                                    ? "bg-sky-50 text-sky-600 font-semibold"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                                }`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="flex items-center gap-2 rounded-lg px-3 py-2">
                                <Info size={18} />
                                About
                            </span>
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `transition ${isActive
                                    ? "bg-sky-50 text-sky-600 font-semibold"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                                }`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="flex items-center gap-2 rounded-lg px-3 py-2">
                                <MessageCircle size={18} />
                                Contact
                            </span>
                        </NavLink>

                        {user ? (
                            <>
                                {isAdmin && (
                                    <NavLink
                                        to="/admin"
                                        className={({ isActive }) =>
                                            `transition ${isActive
                                                ? "bg-sky-50 text-sky-600 font-semibold"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                                            }`
                                        }
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="flex items-center gap-2 rounded-lg px-3 py-2">
                                            <LayoutDashboard size={18} />
                                            Admin Dashboard
                                        </span>
                                    </NavLink>
                                )}

                                <NavLink
                                    to="/my-appointments"
                                    className={({ isActive }) =>
                                        `transition ${isActive
                                            ? "bg-sky-50 text-sky-600 font-semibold"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                                        }`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span className="flex items-center gap-2 rounded-lg px-3 py-2">
                                        <CalendarDays size={18} />
                                        My Appointments
                                    </span>
                                </NavLink>

                                <div className="my-2 border-t border-slate-200" />

                                <div className="flex items-center gap-3 px-3 py-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                                        <UserRound size={18} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-700">
                                            {displayName}
                                        </p>

                                        <p className="truncate text-xs text-slate-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="my-2 border-t border-slate-200" />

                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-sky-600"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="mt-1 rounded-lg bg-sky-500 px-3 py-2 text-center font-semibold text-white transition hover:bg-sky-600"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;

