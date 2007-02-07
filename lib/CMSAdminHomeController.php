<?php
/**
* Home page controller
* @package PHP-WAX CMS
*/

class CMSAdminHomeController extends CMSAdminComponent {
	public $module_name = "home";												
  	public $model;
	public $model_name = "cms_user";
	public $model_class = "CmsUser";
	public $display_name = "Home";
	public $base_url;
	
	function __construct(){
		parent::__construct();
		$this->sub_links = array();
	}
	
	private function process_login() {
		$auth = new WXDBAuthenticate(array("db_table"=>$this->model_name));
		if( $auth->verify($_POST['username'], $_POST['password'])){
		  if($this->authorised_redirect) return $this->authorised_redirect;		  
			else return 'index';
		}
		else {
		  Session::add_message("Sorry, we can't find that username and password. Try again.");
			return $this->unauthorised_redirect;
		}
	}
				
	public function login() {
		if(count($_POST)>0) $this->redirect_to($this->process_login() );
		Session::set( 'timestamp', time() );
		Session::unset_var('errors');
		$this->use_layout = "login";
		$this->redirect_url = Session::get('referrer');
	}
	
	public function logout( ) {
		$auth = new WXDBAuthenticate(array("db_table"=>$this->model_name));
		$auth->logout();
		$this->redirect_to('/');
	}
	
	public function index() {
	  $this->stat_setup();
	  $this->stat_links = ($li = CmsConfiguration::get("stat_link_url")) ? $this->parse_rss($li, 5) : array();
	  $this->link_module = $this->render_partial("stat_links");
	  
	}
	
	public function support() { $this->display_action_name = 'Support'; }

  public function parse_rss($url, $items) {
    $simple = simplexml_load_file($url, "SimpleXMLElement", LIBXML_NOCDATA);
    for($i=0; $i<$items; $i+=1) {
      $title = $simple->channel->item[$i]->title;
      $desc = $simple->channel->item[$i]->description;
      $link = $simple->channel->item[$i]->link;
      $rss[]=array($title, $desc, $link);
    }
    return $rss;
  }
  
  protected function stat_setup() {
    if($_POST['stat_link_url']) CmsConfiguration::set("stat_link_url", $_POST['stat_link_url']);
    if($_POST['visit_link_url']) CmsConfiguration::set("visit_link_url", $_POST['visit_link_url']);
    if($_POST['search_link_url']) CmsConfiguration::set("search_link_url", $_POST['search_link_url']);
    if($_POST['dash_link_url']) CmsConfiguration::set("dash_link_url", $_POST['dash_link_url']);
  }




}

?>