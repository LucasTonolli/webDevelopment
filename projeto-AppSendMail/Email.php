<?php 



class Email
{
    
    private $to;
    private $subject;
    private $message;

    public const STATUS = [
        'success' => [ 
            'cod' => 1 ,
            'description'  => 'Email enviado com sucesso'
        ],
        'fail' => [
            'cod' => 2,
            'description' => 'Falha no envio do email'
        ],
        'unknown' => [
            'cod' => 0,
            'description' => 'Desconhecido'
        ]
    ];

    public function __get($attr)
    {
        return $this->$attr;
    }

    public function __set($attr, $value)
    {
        $this->$attr = $value;
    }

    public function isValid()
    {
        return ($this->to && $this->subject && $this->message);
    }

    public static function getStatus(string $result): array
    {
        return array_key_exists($result, self::STATUS) ? self::STATUS[$result] : self::STATUS['unknown'];
    }
}