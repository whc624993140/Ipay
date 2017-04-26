$(function (e) {


        $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
        $('.tree li.parent_li > span').click(function (e) {
           e.stopPropagation();
            console.log(  $('.tree li.parent_li > span'))
            var children = $(this).parent('li.parent_li').find(' > ul > li ');
            if (children.is(":visible")) {
                children.hide('fast');
                $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-plus-square').removeClass('fa-minus-square');

            } else {
                children.show('fast');
                $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-minus-square').removeClass('fa-plus-square');

            }
//            n=children.is(":visible")?1:0;
//           switch(n)
//           {
//               case 0:children.show('slow');
//                       $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-minus-square').removeClass('fa-plus-square');
//                       alert(123)
//                       break;
//               case 1:children.hide('slow');
//                      $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-plus-square').removeClass('fa-minus-square');
//                      alert(456)
//                   break;
//           }


        });


});