var n = 15,
    win = -1,
    w = 0,
    a = 0,
    s = 0,
    d = 0,
    level = 1
var board = [],
    player_pos = [0, 0],
    hit_pos = [0, 0]
var next_list = [],
    past_list = [],
    level = 1

function init_board() {
    var i, j
    for (i = 0; i < n; i++) {
        board.push([])
        for (j = 0; j < n; j++) {
            if ((i + 1) % 2 == 0 || (j + 1) % 2 == 0) {
                board[i].push(0)
            } else {
                board[i].push(1)
            }
        }
    }
    return board
}

function print_board() {
    var boardstr = ""
    var i, j
    boardstr += "level:" + level + "<br>"
    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            if (board[i][j] == 0) {
                boardstr += "<span class='button' style='background-color:rgba(238, 222, 209, 0.637);'></span> "
            } else if (board[i][j] == 1) {
                boardstr += "<span class='button' style='background-color:rgb(255, 145, 0);'></span> "
            } else if (board[i][j] == 2) {
                boardstr += "<span class='button' style='background-color:red;'></span> "
            } else if (board[i][j] == 3) {
                boardstr += "<span class='button' style='background-color:rgba(37, 207, 15, 0.822);'></span> "
            }
        }
        boardstr += "<br>"
    }
    if (level > 100) {
        document.getElementById("cmd").innerHTML = ""
        document.getElementById("win").innerHTML = "All level passed!"
        document.getElementById("board").innerHTML = ""
    } else {
        document.getElementById("board").innerHTML = boardstr
        if (win != 1) {
            document.getElementById("win").innerHTML = ""
            print_button()
        }
        if (win == 1) {
            document.getElementById("win").innerHTML = "You win!<br>Level up!"
            main()
        }
        if (win == 2) {
            document.getElementById("win").innerHTML = "You can't move here!"
        }
    }

}

function is_in(a, b) { //判断一个坐标列表是否在另一个二维列表里
    for (i in b) {
        if (b[i][0] == a[0] && b[i][1] == a[1]) {
            return 1
        }
    }
    return 0
}

function update_list(next_list, past_list, hit_pos) {
    var w = [hit_pos[0] - 2, hit_pos[1]],
        a = [hit_pos[0], hit_pos[1] - 2],
        s = [hit_pos[0] + 2, hit_pos[1]],
        d = [hit_pos[0], hit_pos[1] + 2];
    past_list.push(hit_pos)
    if (w[0] >= 0 && !is_in(w, past_list) && !is_in(w, next_list)) {
        next_list.push(w)
    }
    if (a[1] >= 0 && !is_in(a, past_list) && !is_in(a, next_list)) {
        next_list.push(a)
    }
    if (s[0] < n && !is_in(s, past_list) && !is_in(s, next_list)) {
        next_list.push(s)
    }
    if (d[1] < n && !is_in(d, past_list) && !is_in(d, next_list)) {
        next_list.push(d)
    }
}

function break_wall(next_list, past_list, hit_pos) {
    var t = [],
        selectable_list = []
    var num = 0
    var r = rand(0, next_list.length - 1)
    hit_pos = [...next_list[r]]
    next_list.splice(r, 1)
    t[0] = hit_pos[0]
    t[1] = hit_pos[1]
    t[0] -= 2
    if (is_in(t, past_list)) {
        t[0] += 1
        selectable_list.push([...t])
        num++
    }
    t[0] = hit_pos[0]
    t[1] = hit_pos[1]
    t[1] -= 2
    if (is_in(t, past_list)) {
        t[1] += 1
        selectable_list.push([...t])
        num++
    }
    t[0] = hit_pos[0]
    t[1] = hit_pos[1]
    t[0] += 2
    if (is_in(t, past_list)) {
        t[0] -= 1
        selectable_list.push([...t])
        num++
    }
    t[0] = hit_pos[0]
    t[1] = hit_pos[1]
    t[1] += 2
    if (is_in(t, past_list)) {
        t[1] -= 1
        selectable_list.push([...t])
        num++
    }
    r = rand(0, num)
    board[selectable_list[r][0]][selectable_list[r][1]] = 1
    return hit_pos
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function print_button() {
    var cmdstr = '<button class="cmd" onclick="ww()">上</button><br>\
    <button class="cmd" onclick="aa()">左</button>\
    <button class="cmd" onclick="ss()">下</button>\
    <button class="cmd" onclick="dd()">右</button>'
    document.getElementById("cmd").innerHTML = cmdstr
}

function ww() {
    w = 1
    win = move(w, a, s, d)
    print_board()
    w = 0
}

function aa() {
    a = 1
    win = move(w, a, s, d)
    print_board()
    a = 0
}

function ss() {
    s = 1
    win = move(w, a, s, d)
    print_board()
    s = 0
}

function dd() {
    d = 1
    win = move(w, a, s, d)
    print_board()
    d = 0
}

function move(w, a, s, d) {
    var t = [...player_pos]
    if (w == 1) {
        t[0] -= 1
        if (t[0] < 0) {
            return 2
        }
    }
    if (a == 1) {
        t[1] -= 1
        if (t[1] < 0) {
            return 2
        }
    }
    if (s == 1) {
        t[0] += 1
        if (t[0] >= n) {
            return 2
        }
    }
    if (d == 1) {
        t[1] += 1
        if (t[1] >= n) {
            return 2
        }
    }
    if (board[t[0]][t[1]] == 3) {
        level++
        return 1
    }
    if (board[t[0]][t[1]] == 0) {
        return 2
    }
    if (board[t[0]][t[1]] == 1) {
        board[t[0]][t[1]] = 2
        board[player_pos[0]][player_pos[1]] = 1
        player_pos = [...t]
        return -1
    }
}

function main() {
    board = []
    next_list = []
    past_list = []
    hit_pos = [0, 0]
    player_pos = [0, 0]
    win = -1
    n += level * 2
    init_board()
    board[0][0] = 2
    board[n - 1][n - 1] = 3
    while (1) {
        update_list(next_list, past_list, hit_pos)
        hit_pos = break_wall(next_list, past_list, hit_pos)
        if (next_list.length == 0) {
            break
        }
    }
    print_board()
}