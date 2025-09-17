<?php
    	require_once ($_SERVER['DOCUMENT_ROOT'].'/music-player/ketnoidb.php');
    	
    	function getUserIP()
        {
            // Get real visitor IP behind CloudFlare network
            if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
                $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
                $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
            }
            $client  = @$_SERVER['HTTP_CLIENT_IP'];
            $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
            $remote  = $_SERVER['REMOTE_ADDR'];
        
            if(filter_var($client, FILTER_VALIDATE_IP))
            {
                $ip = $client;
            }
            elseif(filter_var($forward, FILTER_VALIDATE_IP))
            {
                $ip = $forward;
            }
            else
            {
                $ip = $remote;
            }
        
            return $ip;
        }
        $browserAgent = $_SERVER['HTTP_USER_AGENT'];
        $user_ip = getUserIP();
        
        
    	$Page = 0;
    	$DaKetNoi = 0;
    	$pageId = 0;
    	if (!isset($_GET['pageId']))
    	{
            $ThongBaoLoi = 'Vui lòng quét mã QR trên trang, hoặc nhập Id để điều khiển';
    	}
    	else
    	{
    	    $pageId = $_GET['pageId'];
    	    $SqlCheckKetNoi = "SELECT * FROM remote WHERE pageId=".$pageId." LIMIT 1";
    	    $Query=mysqli_query($db,$SqlCheckKetNoi);
    	    if (mysqli_num_rows($Query) == 0)
    	    {
    	        $ThongBaoLoi = $pageId.': ID trang không đúng!';
    	    }
    	    else
    	    {
    	        while ($Data = mysqli_fetch_array($Query))
    	        {
    	            if ($Data['daKetNoi'] == 0){$Page = 1;}
    	            else if ($Data['browser'] == $browserAgent && $Data['ip'] == $user_ip){$Page = 1;$DaKetNoi = 1;}
    	            else if ($Data['browser'] == '' && $Data['ip'] == ''){$Page = 1;}
    	            else {$ThongBaoLoi = $pageId.': Có người đã nhận quyền điều khiển trang này trước bạn!';}
    	        }
    	    }
    	}
    ?>