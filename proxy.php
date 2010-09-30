<?php
header('Content-type: text/javascript');

// Extract form action and assign to variable
$action = $_POST['action'];

// Assign form array to single variable
$arr = $_POST;

// Remove "action" key from array
unset($arr['action']); 

// Loop through and add keys and values to a single variable
$formVars = "";
foreach ($arr as $key => $value) {
  if (is_array($value)) {
    foreach ($value as $subvalue) {
      $formVars .= $key."=".urlencode($subvalue)."&";
    }
  } else {
    $formVars .= $key."=".urlencode($value)."&";
  }
}

// Remove last "&"
$formVars = substr($formVars,0,-1);

// Get the response
$handle = curl_init($action);

// If there is something, read and return
curl_setopt($handle, CURLOPT_POST, true);
curl_setopt($handle, CURLOPT_POSTFIELDS, $formVars);
curl_setopt ($handle, CURLOPT_FOLLOWLOCATION, 1);
echo curl_exec($handle);
curl_close($handle);
?>