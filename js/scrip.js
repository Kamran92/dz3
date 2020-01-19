$(document).ready(function() {
    modal()
    function modal() {
        let arrBtnModal = [".main_btna", ".main_btn", ".main_nav li:eq(1)"],
            modal = $(".modal"),
            closeModal = $(".close"),
            overlay = $(".overlay");

        arrBtnModal.forEach((item)=> {
            $(item).on("click", function(){
                modal.css({"top": "-550px", "display": "block"});
                modal.animate({
                    top: "0px"
                }, 1000)
                overlay.animate({
                    "opacity": "show"
                }, 1000)
            })
        })

        closeModal.on("click", ()=> {
            modal.animate({
                top: "-550px"
            }, 1000, function() {
                modal.css({"display": "none"});
            })
            
            overlay.animate({
                "opacity": "hide"
            }, 1000)
        })
    } 

    postRequest()
    function postRequest() {
        let formContact = $(".contactform_select"),
        input = $(".contactform_select input"),
        textarea = $(".contactform_select textarea"),
        modal = $(".modal"),
        overlay = $(".overlay"),
        thanks = $(".thanks"),
        backBtn = $(".back");

        formContact.submit(function(event) {
            event.preventDefault();

            let formData = new FormData(event.target);

            let obj = {};
            formData.forEach(function(item, key) {
                obj[key] = item
            })
            
            let json = JSON.stringify(obj);

            $.ajax({
                type: 'POST',
                url: "../server.php",
                data: json,
                dataType: "script",
                error: function() {
                    alert("В запросе была ошибка")
                },
                success: function() {
                    modal.css({"display": "none"});
                    thanks.css({"display": "block", "top": "0px"});

                    backBtn.on("click", function() {
                        thanks.animate({
                            top: "-550px"
                        }, 1000, function() {
                            modal.css({"display": "none"});
                        })
                        overlay.animate({
                            "opacity": "hide"
                        }, 1000)
                    })
                }
            })

            input.each(function(i, elem) {
                if(input[i].type === "checkbox") {
                    input[i].checked = false
                } else {
                    $(input[i]).val("")
                };
            }) 
            textarea.val("");
        })
    }
})