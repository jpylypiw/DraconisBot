/*
  Go on your labels page (https://github.com/nekozbyte/repo-template/labels)
  Edit the following label array
  Press F12 and copy paste this into your console
  Press Enter!!
*/

[
    {
      "name": "C1 - bug",
      "description": "A normal bug, if something isn't working properly",
      "color": "cc6565"
    },
    {
      "name": "C2 - feature",
      "description": "A change, improvement or suggestion of something",
      "color": "dfbb5e"
    },
    {
      "name": "C3 - question",
      "description": "This issue is a question",
      "color": "ece476"
    },
    {
      "name": "C4 - duplicate",
      "description": "There is already an issue with this topic",
      "color": "b2cf56"
    },
    {
      "name": "C5 - more info needed",
      "description": "More information about this issue would be nice",
      "color": "3ad1b2"
    },
    {
      "name": "P1",
      "description": "All users will encounter this issue",
      "color": "ffffff"
    },
    {
      "name": "P2",
      "description": "Most of the users will encounter this issue",
      "color": "ffffff"
    },
    {
      "name": "P3",
      "description": "About half of the users will encounter this issue",
      "color": "ffffff"
    },
    {
      "name": "P4",
      "description": "Most of the users will not encounter this issue",
      "color": "ffffff"
    },
    {
      "name": "T1 - critical",
      "description": "The bug causes data loss, crashes, etc",
      "color": "6086e6"
    },
    {
      "name": "T2 - hard",
      "description": "The bug reports incorrect functionality, bad functionality, a confusing user experience, etc",
      "color": "6086e6"
    },
    {
      "name": "T3 - medium",
      "description": "The bug reports cosmetic items, formatting, spelling, colors, etc.",
      "color": "6086e6"
    },

  ].forEach(function(label) {
    addLabel(label)
  })
  
  function updateLabel (label) {
    var flag = false;
    [].slice.call(document.querySelectorAll(".labels-list-item"))
    .forEach(function(element) {
      if (element.querySelector('.label-link').textContent.trim() === label.name) {
        flag = true
        element.querySelector('.js-edit-label').click()
        element.querySelector('.js-new-label-name-input').value = label.name
        element.querySelector('.js-new-label-description-input').value = label.description
        element.querySelector('.js-new-label-color-input').value = '#' + label.color
        element.querySelector('.js-edit-label-cancel ~ .btn-primary').click()
      }
    })
    return flag
  }
  
  function addNewLabel (label) {
    document.querySelector('.js-new-label-name-input').value = label.name
    document.querySelector('.js-new-label-description-input').value = label.description
    document.querySelector('.js-new-label-color-input').value = '#' + label.color
    document.querySelector('.js-details-target ~ .btn-primary').disabled = false
    document.querySelector('.js-details-target ~ .btn-primary').click()
  }
  
  function addLabel (label) {
    if (!updateLabel(label)) addNewLabel(label)
  }