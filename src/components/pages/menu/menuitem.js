const MenuItem = () => {

    const style = {
        height: '22em',
        overflowY: 'scroll'
    };

    return (
        <div className="col-6" style={style}>
            <div class="card card-info">
                <div class="card-header">
                    <h3 class="card-title">Menu Item List</h3>
                </div>
                {/* <!-- /.card-header --> */}
                <div class="card-body">
                    <button class="btn btn-primary right" onClick="">Add</button>
                    <table id="example1" class="table table-bordered table-striped mt-2">
                        <thead>
                            <tr>
                                <th>Screen ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>


                        </tbody>
                    </table>
                </div>
                {/* <!-- /.card-body --> */}
            </div>

        </div>
    );
};

export default MenuItem;