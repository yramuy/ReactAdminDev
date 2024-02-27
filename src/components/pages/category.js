import { useEffect, useState } from "react";
import Layout from "../layout";
import { GetApiService } from "../api";

const Category = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const url = '/BillsPayeApis/v1/categories';
        await GetApiService(url).then((data) => {
            if (data.status == 1) {
                setCategories(data.category);
            }
        });
    }

    console.log(categories)
    return (
        <>
            <Layout>
                {/* <!-- Content Header (Page header) --> */}
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0">Category List</h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">Category List</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Main content --> */}
                <section class="content">
                    <div class="container-fluid">
                        {/* <!-- Small boxes (Stat box) --> */}

                        <div class="card card-info">
                            <div class="card-header">
                                <h3 class="card-title">Category List</h3>
                            </div>
                            {/* <!-- /.card-header --> */}
                            <div class="card-body">
                                {/* <a class="btn btn-primary float-right" href="category.php">Add Category</a> */}
                                <table id="example1" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            {/* <th>SNo</th> */}
                                            <th>Category Id</th>
                                            <th>Category Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            categories.map((cat, index) => (
                                                <tr key={cat.id}>
                                                    {/* <td>{index}</td> */}
                                                    <td>{cat.id}</td>
                                                    <td>{cat.name}</td>
                                                    <td style={{display: 'flex', gap: '5px'}}>
                                                        <a href="#" class="btn btn-info"><i class="fas fa-edit"></i></a>
                                                        <a href="#" class="btn btn-danger"><i class="fas fa-trash"></i></a>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* <!-- /.card-body --> */}
                        </div>

                    </div>
                </section>
                {/* <!-- /.content --> */}
            </Layout>
        </>
    );
};

export default Category;