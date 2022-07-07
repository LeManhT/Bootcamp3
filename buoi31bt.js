// áp dụng Jquery, localStorage làm todo list có dạng
// [
// {note: ‘làm bài tập’, deadline: new Date(‘2022/10/2’), priority: ‘high’, done: true},
// {note: ‘làm bài tập’, deadline: new Date(‘2022/10/2’), priority: ’low’, done: false},
// {note: ‘làm bài tập’, deadline: new Date(‘2022/10/2’), priority: ’medium’, done; false},
// ]

// chức năng yêu cầu
// 	thêm sửa xóa công việc
// 	công việc đã done thì background xanh (background tùy ý chọn)
// 	công việc đã quá deadline có background đỏ (background tùy ý chọn)

// 	(tạo ô select option chế độ sắp xếp : 
// xếp theo deadline, 
// xếp theo ưu tiên, 
// xếp theo note, 
// xem công việc đã done, 
// xem công việc chưa done )


let data = window.localStorage.getItem('listJob');
if (!data) {
    window.localStorage.setItem('listJob', '[]')
    data = [];
} else {
    data = JSON.parse(data);
}


function add() {
    const note = $('#note').val();
    const deadline = $('#deadline').val();
    const priority = $('#priority').val();
    const done = $('#done').val();
    if (!note || !deadline || !priority) {
        alert('Vui lòng điền đầy đủ thông tin')
    } else {
        data.push({ note: note, deadline: deadline, priority: priority, done: done })
        window.localStorage.setItem('listJob', JSON.stringify(data));
        $('.closeModal').trigger('click');
        render();
    }
}


render();


var key = 0;
function render() {
    $('.task-todo').html(` `);
    data.map(function (value, index) {
        $('.task-todo').append(`
            <div class = "task task${index}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Task : ${value.note},
                Deadline : ${value.deadline},
                Priority : ${value.priority}
            </div>
        `)
        if (value.done === 'true') {
            $(`.task${index}`).css({
                'background-color': 'aqua',
                'padding': '20px 40px',
                'margin': '20px 0',
                'border-radius': '10px'
            })
        } else {
            $(`.task${index}`).css({
                'background-color': 'red',
                'padding': '20px 40px',
                'border-radius': '10px',
                'margin': '20px 0'
            })
        }

        $(`.task${index}`).on('click', function () {
            key = index;
            $('.createTask').css({
                'display': 'none'
            })
            $('.update').css({
                'display': 'inline-block'
            })
            $('.delete').css({
                'display': 'inline-block'
            })
        })
    })
    $('.totalTask').html(' ')
    $('.totalTask').append(`
    ${data.length}
`)
    sort();
}


// Sua

function update() {
    const note = $('#note').val();
    const deadline = $('#deadline').val();
    const priority = $('#priority').val();
    const done = $('#done').val();
    if (!note || !deadline || !priority) {
        alert('Vui lòng điền đầy đủ thông tin')
    }

    data[key] = { note: note, deadline: deadline, priority: priority, done: done }
    window.localStorage.setItem('listJob', JSON.stringify(data));
    $('.closeModal').trigger('click');
    render();
}


// Xoa

function deleteData() {
    data.splice(key, 1);
    window.localStorage.setItem('listJob', JSON.stringify(data));
    $('.closeModal').trigger('click');
    render();
}


$('.add-task').on('click', function () {
    $('.createTask').css({
        'display': 'inline-block'
    })
    $('.update').css({
        'display': 'none'
    })
    $('.delete').css({
        'display': 'none'
    })
})




