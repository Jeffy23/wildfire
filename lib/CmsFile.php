<?php

class CmsFile extends WXFileActiveRecord {
  public function find_all_images() {
	  return $this->find_all(array("conditions"=>"type LIKE '%image%'"));
	}
	
	public function find_filter_images($filter, $limit = false) {
    $params = array("conditions"=>"type LIKE '%image%' AND (filename LIKE '%$filter%' OR caption LIKE '%$filter%')");
    if($limit) $params['limit']=$limit;
	  return $this->find_all($params);
	}
	
	public function extension() {
	  return ".gif";
	  $ext = ".".substr(strrchr($this->type, "/"), 1);
	  if($ext != ".gif" || $ext !=".png") $ext = ".jpg";
	  return $ext;
	}
	
	public function find_all_files() {
	  return $this->find_all(array("conditions"=>"type NOT LIKE '%image%'"));
	}
	
	public function file_size() {
	  $size = floor( filesize($this->path.$this->filename) / 1024);
	  if($size < 1024) return $size." Kb";
	  return ($size / 1024)." Mb"; 
	}
	
	
}

?>