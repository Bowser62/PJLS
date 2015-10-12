level=1
var regex = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/,
    symbol: /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/,
    alphabet: /(?=.*a)(?=.*b)(?=.*c)(?=.*d)(?=.*e)(?=.*f)(?=.*g)(?=.*h)(?=.*i)(?=.*j)(?=.*k)(?=.*l)(?=.*m)(?=.*n)(?=.*o)(?=.*p)(?=.*q)(?=.*r)(?=.*s)(?=.*t)(?=.*u)(?=.*v)(?=.*w)(?=.*x)(?=.*y)(?=.*z)./,
    fiveten: /[0-9]{5}.+[0-9]{10}/
}

function show() {
    document.getElementById("password").type = "text";
    document.getElementById("passwordConf").type = "text";
}

function placeholders() {
    email=document.getElementById("email").value;
    pass=document.getElementById("password").value;
    passConf=document.getElementById("passwordConf").value;
    error=document.getElementById("errorMessage");
}

function progress() {
    placeholders()
    switch (level) {
        case 1:
            did=level1()
            break
        case 2:
            did=level2()
            break
        case 3:
            did=level3()
            break
        case 4:
            did=level4()
            break
        case 5:
            did=level5()
            break
        case 6:
            did=level6()
            break
        case 7:
            end()
    }
    if (did) {
        progress()
    }
}

function level1() {
    if (pass == passConf && regex.email.test(email) && pass != "") {
        errtype = "";
        level = 2
        do_ret = 1
    } else if (pass != passConf){
        errtype = "Passwords Don't Match";
        do_ret = 0
    } else if (!regex.email.test(email)){
        errtype = "Invalid Email";
        do_ret = 0
    } else {
        errtype = "Password Cannot Be Blank"
        do_ret = 0
    }
    error.innerHTML = errtype
    return do_ret
}
function level2() {
    if (level1()) {
        if (pass.length >= 8) {
            level = 3
            errtype = ""
            do_ret = 1
        } else {
        errtype = "Password Must Be 8 Characters Long"
        do_ret = 0
        }
    }
    error.innerHTML = errtype
    return do_ret
}
function level3() {
    if (level2()) {
        if (/[0-9]/.test(pass) && /[A-Z]/.test(pass)) {
            level = 4
            errtype = ""
            do_ret = 1
        } else if (/[A-Z]/.test(pass)){
            errtype = "Your Password Must Contain A Number"
            do_ret = 0
        } else {
            errtype = "Your Password Must Contain A Capital Letter"
            do_ret = 0
        }
    }
    error.innerHTML = errtype
    return do_ret
}
function level4() {
    if (level3()) {
        if (regex.symbol.test(pass)) {
            level = 5
            errtype = ""
            do_ret = 1
        } else {
            errtype = "Your Password Must Contain A Symbol"
            do_ret = 0
        }
    }
    error.innerHTML = errtype
    return do_ret
}
function level5() {
    if (level4()) {
        if (regex.alphabet.test(pass)) {
            level = 6
            errtype = ""
            do_ret = 1
        } else {
            errtype = "Your Password Must Contain Every Letter in The Alphabet"
            do_ret = 0
        }
    }
    error.innerHTML = errtype
    return do_ret
}
function level6() {
    if (level5()) {
        if (regex.fiveten.test(pass)) {
            level = 7
            errtype = ""
            do_ret = 7
        } else {
            errtype = "Your Password Must Start With 5 Numbers and End With 10 Numbers"
            do_ret = 0
        }
    }
    error.innerHTML = errtype
    return do_ret
}
function end() {
    errtype = "Success! Account Created!"
    error.innerHTML = errtype
    error.style.color = "green"
}