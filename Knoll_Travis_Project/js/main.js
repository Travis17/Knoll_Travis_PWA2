/*  
	Note Clouds
	Author: Travis Knoll
*/
/* Toggle options */
(function($){
	
	$('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();

    $('#tabs-nav li').click(function(e) {
        e.preventDefault();
        $('#tabs p').hide();

        $('#tabs-nav .current').removeClass("current");
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');

        $('#tabs ' + clicked).fadeIn('fast');
    }).eq(0).addClass('current');
	
/* Modal */

    $('.modalClick').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeIn()
            .find('#modal')
            .fadeIn();
    });
    $('.close').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeOut()
            .find('#modal')
            .fadeOut();
    });


    $('.mystatus').mouseover(function(){
        $(this).fadeTo(100, .3);
    });
    $('.mystatus').mouseout(function(){
        $(this).fadeTo(100, 1);
    });


/* Tooltip */

 $('.masterTooltip').hover(function(){
     var title = $(this).attr('title');
     $(this).data('tipText', title).removeAttr('title');
     $('<p class="tooltip"></p>')
     .text(title)
         .appendTo('body')
         .fadeIn('slow');
 }, function() {
     $(this).attr('title', $(this).data('tipText'));
     $('.tooltip').remove();
 }).mousemove(function(e) {
     var mousex = e.pageX + 20;
     var mousey = e.pageY + 10;
     $('.tooltip')
         .css({ top: mousey, left: mousex })

 });
/* Log In */
        $('#signinButton').click(function(){
            var user = $('#user').val();
            var pass = $('#pass').val();
            console.log("This notifies if the password is working");
            $.ajax({
                url: 'xhr/login.php',
                type: 'post',
                dataType: 'json',
                data: {
                    username: user,
                    password: pass
                },
                success:function(response){
                    console.log("Test User");
                    if(response.error){
                    alert(response.error);
                } else {
                        window.location.assign('admin.html')
                    };

            }

        });

        });
/* Log out */

    $('#logOut').click(function(e){
        e.preventDefault;
        $.get('xhr/logout.php', function(){
            window.location.assign('index.html')
        })
    });
/* Register */

    $('#register').on('click', function(){
        var firstname= $('#first').val(),
            lastname= $('#last').val(),
            email= $('#email').val(),
            username= $('#userName').val(),
            password= $('#password').val();
            console.log(firstname+' '+lastname+' '+email+' '+username+' '+password)

        $.ajax({
            url:'xhr/register.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: password
            },

            success: function(response){
                if (response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html');
                }
            }
        });
    });
/* Dashboard button */

    $('.dashboard').on('click', function(e){
        e.preventDefault();
        window.location.assign('admin.html');
    });

/* Projects page logout button */
	$('.logOut').on('click', function(e){
        e.preventDefault();
        window.location.assign('index.html');
    });

/* Display username on */

    $.getJSON("xhr/check_login.php", function(data){
        console.log(data);
        $.each(data, function(key, val){
            console.log(val.first_name);
            $(".userid").html("Welcome User: " + val.first_name);
        });
    });

    /* new projects */
$('#addButton').on('click', function(){
    var projName = $('#projectName').val(),
        projDesc = $('#projectDescription').val(),
        projDue = $('#projectDueDate').val(),
        status = $('input[name = "status"]:checked').prop("id");

    $.ajax({
        url: "xhr/new_project.php",
        type: "post",
        dataType: "json",
        data: {
            projectName: projName,
            projectDescription: projDesc,
            dueDate: projDue,
            status: status
        },

        success: function(response) {
            console.log('testing for success');

            if(response.error) {
                alert(response.error);
            }else{
                window.location.assign("projects.html")
            };
        }
    });
});

    /* get the projects */
 var projects = function(){
     $.ajax({
         url: 'xhr/get_projects.php',
         type: 'get',
         dataType: 'json',
         success: function (response) {
             if (response.error) {
                 console.log(response.error);
             } else {
                 for (var i = 0, j = response.projects.length; i < j; i++) {
                     var result = response.projects[i];

                     $(".projects").append(
                         '<div style="border:1px solid black">' +
                         " <input class='projectid' type='hiddne' value='" + result.id + "'>" +
                         " Project Name: " + result.projectName + "<br>" +
                         " Project Description: " + result.projectDescription + "<br>" +
                         " Project Status: " + result.status + "<br>"
                         + '<button class="deletebtn">Delete</button>'
                         + '<button class="editbtn">Edit</button>'
                         + '</div> <br>'
                     );

                 };
                 $(".projects").on('click', function(e) {
                     e.preventDefault();
                     $("button:first").remove();




                     console.log('test delete');
                     $.ajax({
                         url: 'xhr/delete_project.php',
                         data: {
                             projectID: result.id
                         },
                         type: 'POST',
                         dataType: 'json',
                         success: function(response){
                             console.log('Test for success');
                             if(response.error) {
                                 alert(response.error)
                             }else{
                                 window.location.assign("projects.html");
                             };
                         }

                     });

                 });




             }
         }
     })
 }
    projects();

})(jQuery); // end private scope




