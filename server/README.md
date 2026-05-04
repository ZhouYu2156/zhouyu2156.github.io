
## 安装最新 Django

```bash
$ python -m pip install Django
```

- 查看 `django` 版本

```bash
$ python -m django --version
```

```python
import django

print(django.get_version())
```

## 创建项目

```bash
$ django-admin startproject myapp [project_name]
```

## 启动项目

```bash
$ python manage.py runserver [0.0.0.0:8000]
```

## 新建应用

```bash
$ python manage.py startapp app_name
```

DRF

函数视图：`@api_view`
类视图：`APIView`
通用视图：`GenericAPIView`
视图集：`ViewSet`
自动路由注册：`DefaultRouter`

认证权限系统：Session、Token、JWT、Basic