var dataTable;


$(document).ready(function () {
    loadDataTable();
})

function loadDataTable() {
    dataTable = $('#DT_load').dataTable({
        ajax: {
            "url": "/Books/GetAll/",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "25%" },
            { "data": "author", "width": "25%" },
            { "data": "isbn", "width": "15%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center" style="margin: 0 auto; padding: 0px;">\
                                <a href="/Books/Upsert?id=${data}" class="btn btn-success text-white" style="cursor: pointer; width: 40%; margin: 0 auto; margin-right: 5%;">Edit</a>\
                                <a class="btn btn-danger text-white" onclick="DeleteBook(${data})" style="cursor: pointer; width: 40%; margin: 0 auto; margin-left: 5%;">Delete</a>\
                            </div>`;
                },
                "width": "35%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    })
}

function DeleteBook(id) {
    let url = "/Books/Delete?id=" + id;
    swal({
        title: "Are you sure?",
        text: "You can not undo this action!",
        buttons: {
            cancel: true,
            confirm: true
        },
        icon: "warning",
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    toastr.options.closeButton = true;
                    toastr.options.newestOnTop = true;
                    toastr.options.progressBar = true;
                    toastr.options.timeOut = 1000;
                    if (data.success) {
                        dataTable.api().ajax.reload();
                        toastr.success(data.message);
                    } else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    })
}