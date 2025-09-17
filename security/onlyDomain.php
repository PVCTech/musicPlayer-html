<?php
    $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
    $allowed_host = 'https://mlnd.pvcgo.net';
    if (strpos($referer, $allowed_host) !== 0) 
    {
        header('HTTP/1.1 403 Forbidden');
        die('Access denied.');
    }
?>