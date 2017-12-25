$(document).ready(function () {
  'use strict';
  $('.insert-tag').on('click', function () {
    var range = saveSelection();
    console.log($(range.commonAncestorContainer.parentNode).closest('.tag').length);
    if (
      !range ||
      !$(range.commonAncestorContainer.parentNode).closest('.editable-content').length ||
      $(range.commonAncestorContainer.parentNode).closest('.tag').length
    ) {
      alert('Place the cursor in the position to insert the tag');
      return;
    }

    var text = prompt('Type something...');
    restoreSelection(range);
    if (!text || !text.trim())
      return;

    insertTextAtCursor(text);
  });

  $(document).on('click', '.tag i', function () {
    $(this).parent().remove();
  });

  function insertTextAtCursor(text) {
    var range;
    var sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      var node = document.createElement('span');
      node.classList.add('tag');
      node.setAttribute('contenteditable', false);
      node.innerHTML = text + '<i>&times;</i>';
      range.insertNode(document.createTextNode(' '));
      range.insertNode(node);
      range.collapse(false);
    } else {
      console.error('No range found');
    }
  }

  function saveSelection() {
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }

    return null;
  }

  function restoreSelection(range) {
    if (range) {
      if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.selection && range.select) {
        range.select();
      }
    }
  }

});
