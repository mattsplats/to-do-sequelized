'use strict';

// On load
$(function () {
  const SLIDE_TIME = 175;

  // If completed tasks is not empty, show clear button
  if ($('#done').children().length > 0) $('#clear_completed').show();



  // Create new task (on click)
  $('#create').on('click', function (e) {
    const desc = $('#new_task').val().trim();

    if (desc) {
      $.post('/', {desc: desc}, function (data) {
        const template = `
<li id="item_${data.id}" class="list-group-item">
  <div id="text_${data.id}">
    <button type="button" data-id="${data.id}" class="btn btn-danger delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
    <button type="button" data-id="${data.id}" class="btn btn-default update"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>
    <span>&nbsp;</span>
    <span id="task_${data.id}">${desc}</span>
    <div class="pull-right">
      <button type="button" data-id="${data.id}" class="btn btn-success complete"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
    </div>
  </div>

  <div id="update_${data.id}" class="input-group" style="display: none;">
    <span class="input-group-btn">
      <button type="button" class="btn btn-success submitUpdate" data-id="${data.id}"><span class="glyphicon glyphicon-ok" aria-hidden="true"></button>
    </span>
    <input type="text" class="form-control updateInput" id="update_input_${data.id}" value="${desc}" maxlength="30">
  </div>
</li>`
        
        $('#list').append(template);
        $(`#item_${data.id}`).hide().slideDown({duration: SLIDE_TIME});
        $('#new_task').val('');
      });
    }
  });

  // Create new task (on enter)
  $('#new_task').keypress(function (e) {
    if (e.which == 13) $('#create').click();
  });



  // Mark task completed
  $('#list').on('click', '.complete', function (e) {
    const id   = $(this).data('id'),
          desc = $(`#task_${id}`).text();

    $.ajax({
        method: 'PUT',
        data: {id: id}
    }).then(function (data) {
      const newDone = $('<li>').text(desc).addClass('list-group-item');
      $('#done').append(newDone);
      newDone.hide().slideDown({duration: SLIDE_TIME});
      $(`#item_${id}`).slideUp({duration: SLIDE_TIME, complete: $(this).remove()});
      $('#clear_completed').show({delay: 50, duration: 50});
    });
  });



  // Show update input
  $('#list').on('click', '.update', function (e) {
    const id    = $(this).data('id'),
          input = $(`#update_input_${id}`);  // Store the element reference so we can use a native JS method later

    $(`#update_${id}`).show({duration: 125});
    $(`#text_${id}`).hide();
    input.focus();
    input[0].setSelectionRange(30,30);  // Sets the cursor location at the end of the input (max chars == 30)
  });

  // Make put request with updated task (on click)
  $('#list').on('click', '.submitUpdate', function (e) {
    const id   = $(this).data('id'),
          desc = $(`#update_input_${id}`).val().trim();

    if (task) {
      $.ajax({
          method: 'PUT',
          data: {id: id, desc: desc}
      }).then(function (data) {
        $(`#task_${id}`).text(desc);
        $(`#update_${id}`).hide();
        $(`#text_${id}`).show();
      });
    }
  });

  // Make put request with updated task (on enter)
  $('#list').on('keypress', '.updateInput', function (e) {
    if (e.which == 13) $(this).prev().children().click();  // Previous div, child button
  });



  // Delete task
  $('#list').on('click', '.delete', function (e) {
    const id = $(this).data('id');

    $.ajax({
        method: 'DELETE',
        data: {id: id}
    }).then(function (data) {
      $(`#item_${id}`).slideUp({duration: SLIDE_TIME, complete: $(this).remove()});
    });
  });

  // Clear completed tasks list
  $('#clear_completed').on('click', function (e) {
    $.ajax({
        method: 'DELETE',
        data: {id: 'completed'}
    }).then(function (data) {
      $('#clear_completed').hide({duration: 100});
      $('#done').children().slideUp({duration: SLIDE_TIME});
      setTimeout(() => $('#done').empty(), SLIDE_TIME + 100);  // Remove elements from page after timeout (otherwise animation fails)
    });
  });
});