import Header from '../Commons/Header';
import Footer from '../Commons/Footer';

import '../../css/products.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {products} from "../../data/Products";
import {most, mostDownloaded, mostViewed, switchPage} from "../../redux/Action";
import SectionBreadcrumb from "../Commons/SectionBreadcrumb";

const categories = ['Android', 'iOS', 'PHP & MySQL', 'WordPress', 'Visual C#', 'Asp/Asp.NET',
    'Java/JSP', 'Flutter', 'React JS', 'Python', 'NodeJS', 'Ruby']

function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebar-item">
                <h6 className="list-group-item font-weight-bolder">Phân loại code</h6>
                <div className="list-group">
                    {categories.map((value, index) => (
                        <a className="list-group-item d-flex justify-content-between align-items-center" key={index} href="#">
                            <span>{value}</span>
                            <span className="badge badge-light font-weight-normal">12</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className="sidebar-item mt-4">
                <h6 className="list-group-item font-weight-bolder">Code phổ biến</h6>
                <div className="list-group">
                    {Array(9).fill(1).map((value, index) => (
                        <a className="list-group-item d-flex align-items-center" key={index} href="#">
                            <div className="align-self-start mt-2 mr-2">
                                <span className="popular-rank">{++index}</span>
                            </div>
                            <img className="mr-2" src={require("../../img/products/lp-1.jpg")} alt=""/>
                            <span className="popular-title">Bundle 5 Android Studio games</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ProductItem(props) {
    const p = props.data
    return (
        <div className="product-item">
            <a className="product-item-img">
                <img src={p.img} alt=""/>
            </a>
            <div className="product-item-title d-flex justify-content-center align-items-center text-center pt-2">
                <div className="title-wrapper">
                    <a>{p.name}</a>
                </div>
            </div>
            <div className="product-item-stats d-flex justify-content-between">
                <div><i className="fa fa-eye"></i> {p.viewed}</div>
                <div><i className="fa fa-download"></i> {p.downloaded}</div>
            </div>
            <div className="product-item-actions d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-start">
                    <a className="product-item-action mr-1"><i className="fa fa-thumbs-up"></i></a>
                    <a className="product-item-action"><i className="fa fa-download"></i></a>
                </div>
                <div className="product-item-stars">
                    {Array(5).fill(1).map((value, index) => (<i className="fa fa-star" key={index}></i>))}
                </div>
            </div>
            <div className="product-item-bottom d-flex justify-content-between align-items-center">
                <a className="product-item-brand"><i className="fa fa-android"></i> {p.type}</a>
                <a className="product-item-price">{p.price} VNĐ</a>
            </div>
        </div>
    )
}

function ProductItemRow(props) {
    const p = props.data
    return (
        <div className="product-item-row mb-4">
            <div className="row no-gutters">
                <a className="product-item-img col-lg-4 pr-3">
                    <img src={p.img} alt=""/>
                </a>
                <div className="product-item-row-content col-lg-6">
                    <a className="product-item-row-title">{p.name}</a>
                    <a className="product-item-brand"><i className="fa fa-android"></i> {p.type}</a>
                    <div className="product-item-stars">
                        {Array(5).fill(1).map((value, index) => (<i className="fa fa-star" key={index}></i>))}
                    </div>
                    <div className="product-item-stats d-flex justify-content-start">
                        <div><i className="fa fa-eye"></i> {p.viewed}</div>
                        <div><i className="fa fa-download"></i> {p.downloaded}</div>
                    </div>
                    <p className="product-item-row-description">{p.description}</p>
                </div>
                <div className="col-lg-2 d-flex flex-column justify-content-end align-items-end">
                    <div className="pr-3 pb-3">
                        <div className="product-item-row-price text-center">
                            <a className="d-inline text-center">{p.price} VNĐ</a>
                        </div>
                        <div className="d-flex justify-content-end">
                            <a className="product-item-action mr-1"><i className="fa fa-thumbs-up"></i></a>
                            <a className="product-item-action"><i className="fa fa-download"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Products(props) {
    const products = useSelector(state => state.listProductsReducer.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(switchPage(1))
    }, [])

    return (
        <div className="row">
            {products.map((value, index) => {
                return props.isGrid ?
                    (<div className="product-item-container col-lg-4 col-md-6 col-sm-6" key={index}>
                        <ProductItem data={value}/>
                    </div>) :
                    (<div className="product-item-container col-12" key={index}>
                        <ProductItemRow data={value}/>
                    </div>)
            })}
        </div>
    )
}

function Filter(props) {
    const dispatch = useDispatch()
    const [layout, setLayout] = useState('grid')
    const currentPage = useSelector(state => state.listProductsReducer.page)
    const sort = useSelector(state => state.listProductsReducer.sort)

    function onLayoutClick(isGrid) {
        props.onLayout(isGrid)
        setLayout(isGrid === true ? 'grid' : 'row')
    }

    function onSortClick(sort) {
        switch (sort) {
            case 'mostViewed':
                dispatch(mostViewed())
                break;
            case 'mostDownloaded':
                dispatch(mostDownloaded())
                break;
            default:
                dispatch(most())
                dispatch(switchPage(currentPage))
        }
    }

    return (
        <div className="filters mb-4">
            <div className="row">
                <div className="col-lg-4 d-flex justify-content-start align-items-center">
                    <div className="filter-found">
                        <h6>Tìm thấy <b>17</b> sản phẩm</h6>
                    </div>
                </div>
                <div className="col-lg-8 d-flex justify-content-end align-items-center">
                    <div className="filter-sort mr-5">
                        <span>SẮP XẾP</span>
                        <ul className="d-inline-block">
                            <li className={sort === 'most' ? "filter-active" : ""}
                                onClick={() => onSortClick('most')}>Mới nhất
                            </li>
                            <li className={sort === 'mostViewed' ? "filter-active" : ""}
                                onClick={() => onSortClick('mostViewed')}>Xem nhiều
                            </li>
                            <li className={sort === 'mostDownloaded' ? "filter-active" : ""}
                                onClick={() => onSortClick('mostDownloaded')}>Tải nhiều
                            </li>
                        </ul>
                    </div>
                    <div className="filter-layout d-flex align-items-center">
                        <span className={`icon_grid-2x2 ${layout === 'grid' ? "filter-active" : ""}`} onClick={() => onLayoutClick(true)}></span>
                        <span className={`icon_ul ${layout === 'row' ? "filter-active" : ""}`} onClick={() => onLayoutClick(false)}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Pagination(props) {
    const sort = useSelector(state => state.listProductsReducer.sort)
    const currentPage = useSelector(state => state.listProductsReducer.page)
    const dispatch = useDispatch()

    function onSwitchPage(page) {
        const pages = props.numbers.length
        const pageNow = page < 1 || page > pages ? currentPage : page
        dispatch(switchPage(pageNow))
        switch (sort) {
            case 'mostViewed':
                dispatch(mostViewed())
                break
            case 'mostDownloaded':
                dispatch(mostDownloaded())
                break
            default:
        }
    }

    return (
        <ul className="product-pagination float-right mt-3">
            <li onClick={() => onSwitchPage(currentPage - 1)}><i className="fa fa-chevron-left"></i></li>
            {props.numbers.map((value, index) => (
                <li className={value === currentPage ? "active" : ""} key={index} onClick={() => onSwitchPage(value)}>{value}</li>
            ))}
            <li onClick={() => onSwitchPage(currentPage + 1)}><i className="fa fa-chevron-right"></i></li>
        </ul>
    )
}

function ProductsContainer() {
    const itemsPerPage = 10
    const pages = Math.ceil(products.length / itemsPerPage)
    const numbers = [...Array(pages + 1).keys()].slice(1)

    const [grid, setGrid] = useState(true)

    return (
        <section className="product">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-5">
                        <SideBar/>
                    </div>
                    <div className="col-lg-9 col-md-7 pl-4">
                        <Filter onLayout={(idGrid) => setGrid(idGrid)}/>
                        <Products isGrid={grid}/>
                        <Pagination numbers={numbers}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function ListProducts() {
    return (
        <>
            <Header/>
            {/*<SectionSubHero/>*/}
            <SectionBreadcrumb/>
            <ProductsContainer/>
            <Footer/>
        </>
    )
}