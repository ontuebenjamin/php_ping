<?php
	ini_set('display_errors', '0'); 
	$domain = $_POST['domain'];
	$ms = pingDomain( $domain );
	if( $ms == -1 ){
		echo json_encode( array( 'error'=>'Cannot reach!' ) );
	}
	else{
		echo json_encode( array( 'ms'=>$ms, 'domain'=> $domain ) );
	}
	
	function pingDomain($domain){
		$starttime = microtime(true);
		$file      = fsockopen ($domain, 80, $errno, $errstr, 1);
		
		$stoptime  = microtime(true);
		$status    = 0;		
		
		if (!$file) $status = -1;  // Site is down
		else {
			fclose($file);
			$status = ($stoptime - $starttime) * 1000;
			$status = floor($status);
		}
		return $status;
	}